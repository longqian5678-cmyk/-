import {defineStore} from 'pinia';
import {reactive, ref} from 'vue';
import {capitalizeWords} from '@/utils/strUtils';
import PartnerData from '@/assets/data/CNAsList.json';
import axios from 'axios';

class TypeCount {

  // This class is used to hold counts of various types.  For example,
  // a count by country has country abbreviations as keys and the totals
  // as the values.

  [type: string]: any;

  increment(name: string) {
    this[name] = (this[name] ?? 0) + 1;
  }
}

interface PartnerCounts {

  countries: TypeCount;
  role: TypeCount;
  type: TypeCount;

  countriesCount: number;
  totalPartners: number;
}

function createPartnerCounts(): PartnerCounts {

  return {
    countries: new TypeCount(),
    role: new TypeCount(),
    type: new TypeCount(),
    countriesCount: 0,
    totalPartners: 0,
  };
}

type Short2FullNameMap = Map<string, string>;
type Uuid2LongNameMap = Map<string, string>;

export const usePartnerStore = defineStore('partner', () => {

  const cveProgramShortName = 'cve' as const;
  const partnerCounts = reactive(createPartnerCounts());
  const uuid2LongNameMap = ref<Uuid2LongNameMap>(new Map<string, string>());
  const selectedPartnerCountry = ref('');
  // Used to track if a country was selected from the PartnerMap or the
  // CNAs.vue list:
  const selectedCountryInternalChange = ref(true);
  const short2FullNameMap = ref<Short2FullNameMap>(new Map<string, string>());

  async function initialize() {

    populatePartnerCounts();
    createShort2FullNameMap();
    await populateUuid2LongNameMap();
  }

  function populatePartnerCounts() {

    // This populates the counts of partners by country, total number of
    // countries, and total partners.  This function is meant to be called
    // only during store initialization, as it does not reset counts (it
    // assumes the counts in partnerCounts are zero).

    const n_a = 'n/a';

    PartnerData.forEach((partner: any) => {
      partner.CNA.roles.forEach((roleObj: any) => {
        if (roleObj.role.toLowerCase() !== 'secretariat')
          partnerCounts.role.increment(roleObj.role);
      });

      partner.CNA.type.forEach((type: string) => {

        const newType = /^Vulnerability Researcher/i.test(type)
            ? 'Vulnerability Researcher(s)' : type;

        if (newType.toLowerCase() !== n_a) {
          partnerCounts.type.increment(newType);
        }
      });

      partnerCounts.countries.increment(partner.country);
    });

    partnerCounts.totalPartners = PartnerData.length;

    Object.keys(partnerCounts.countries).forEach((country) => {
      if (country !== n_a) {
        partnerCounts.countriesCount += 1;
      }
    });

    const noCountry = 'No country affiliation';

    partnerCounts.countries[noCountry] = partnerCounts.countries[n_a];
    delete partnerCounts.countries[n_a];
  }

  async function populateUuid2LongNameMap() {

    // This function attempts to read the partner name map from the server
    // and populates a mapping of UUIDs to full partner names.  This function
    // is called only once during initialization.  The map file is generated
    // via an AWS lambda.  This mapping was more necessary in the past, but
    // the short to full name mapping is a reliable method for obtaining
    // the full name given the short name (both the "assigner" and "owner"
    // short names).

    const url = `${import.meta.env.VITE_API_BASE_URL}cve-partner-name-map.json`;

    try {
      const response = await axios.get(url, { timeout: 30000 });
      const data = response?.data as Record<string, string> | undefined;

      uuid2LongNameMap.value = data
        ? new Map<string, string>(Object.entries(data))
        : new Map<string, string>();
    } catch (error) {
      console.log(`Unavailable: ${url}`);
    }
  }

  function createShort2FullNameMap() {

    // This creates a mapping of **lowercased** short names to long names,
    // based on the static CNA list data stored locally.  At present,
    // there is no other way to get a long name given a short name.  This
    // function is called only once during initialization.

    PartnerData.forEach((entry: any) => {
      short2FullNameMap.value.set(entry.shortName.toLowerCase(),
                                  entry.organizationName);
    });
  }

  function getOrganizationName(assignerName?: string,
                               assignerUUID?: string,
                               ownerName?: string) {

    // Given the assigner name and UUID, as well as the owner name (optional),
    // return the appropriate name string to display as the CNA for the
    // published record.  In almost all cases, this will be the long name
    // obtained by using the UUID to get the name from the map.  When the
    // assigner and owner name are different, the owner's name is displayed
    // (it's assumed the ownership has changed and the assigner name does NOT
    // reflect the change).

    const nameUnavailable = 'Name Unavailable';

    if (assignerName === undefined && assignerUUID === undefined
        && ownerName === undefined) {
      return nameUnavailable;
    }

    const assignerNameLower = assignerName?.toLowerCase();

    if (ownerName) {
      const ownerNameLower = ownerName.toLowerCase();

      if (assignerNameLower !== ownerNameLower) {

        // Display the owner name - try to get the full name using the
        // static CNA list.  Otherwise, the owner's short name is displayed.

        return short2FullNameMap.value.get(ownerNameLower)
          || short2DisplayName(ownerName);
      }
    }

    // The displayed name is based on the assigner.

    const longName = assignerUUID === undefined
        ? undefined
        : uuid2LongNameMap.value.get(assignerUUID);

    if (longName !== undefined)
      return longName;
    else if (assignerNameLower === cveProgramShortName)
      return 'CVE Program';
    else if (assignerName !== undefined && assignerNameLower !== undefined)
      return short2FullNameMap.value.get(assignerNameLower)
        || short2DisplayName(assignerName);

    return nameUnavailable;
  }

  function short2DisplayName(shortName: string) {

    // Modify a given "short name" for display - replace any underscores
    // with a space and capitalize each word.

    return capitalizeWords(shortName.replace('_', ' '));
  }

  return {
    cveProgramShortName,
    partnerCounts,
    uuid2LongNameMap,
    selectedPartnerCountry,
    selectedCountryInternalChange,
    short2FullNameMap,
    initialize,
    getOrganizationName
  };
});
