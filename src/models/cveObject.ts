import {Container, type ContainerData} from "./container";

interface AffectedProduct {
  cpes?: Array<string>;
  defaultStatus?: string;
  platforms?: Array<string>;
  product: string;
  vendor: string;
  versions?: Array<Version>;
}

interface Version {
  changes?: Array<VersionChange>;
  lessThan?: string;
  lessThanOrEqual?: string;
  status: string;
  version: string;
  versionType?: string;
}

interface VersionChange {
  at: string;
  status: string;
}

interface Description {
  lang: string;
  value: string;
}

interface Reference {
  hostname?: string;
  name?: string;
  tags?: Array<string>;
  url: string;
}

interface CveIdData {
  cve_id: string;
  cve_year: string;
  dateUpdated: string;
  owning_cna: string;
  state: string;
}

interface CveRecordData {
  containers: {
    cna: ContainerData;
    adp?: Array<ContainerData>;
  };
  cveMetadata: {
    assignerOrgId: string;
    assignerShortName?: string;
    cveId: string;
    datePublished?: string;
    dateUpdated?: string;
    state: string;
  };
}

interface ProductDisplay {
  vendor: string;
  product: string;
  platforms: Array<string>;
  cpes: Array<string>;
  defaultStatus: string;
  versionsColumns: [],
}

interface ProviderMetadata {
  dateUpdated?: string;
  orgId: string;
  shortName?: string;
}

interface VersionRange {

  parentRange: Array<string>;
  parentStatus: string;
  changes: Array<Array<string>>;
}

interface VersionTable {

  headings: Array<string>;
  twoDTable: Record<string, Array<VersionRange>>;
}

enum State {
  Published = 'PUBLISHED',
  Rejected = 'REJECTED',
  Reserved = 'RESERVED',
  Unknown = 'UNKNOWN'
}

enum VersionStatus {
  Affected = 'affected',
  Unaffected = 'unaffected',
  Unknown = 'unknown'
}

type CveInput = CveIdData | CveRecordData;

export class CveObject {

  assignerOrgId: string = '';
  assignerShortName: string = '';
  datePublished: string = '';
  dateUpdated: string = '';
  descriptions?: Array<Description> = [];
  id: string = '';
  owningCna: string = '';
  references?: Array<Reference> = [];
  state: string = 'UNKNOWN';
  cna?: Container = undefined;
  cveProgram?: Container = undefined;
  adp: Array<Container> = [];
  sadp?: Container = undefined;

  constructor();
  constructor(cveData: CveIdData);
  constructor(cveData: CveRecordData);
  constructor(cveData?: CveInput) {

    if (cveData)
      this.apply(cveData);
  }

  apply(cveData: CveIdData): this;
  apply(cveData: CveRecordData): this;
  apply(cveData: CveInput): this;
  apply(cveData: CveInput): this {

    if (CveObject.isCveIdData(cveData))
      this.applyCveIdData(cveData);
    else
      this.applyCveRecordData(cveData);

    return this;
  }

  updateFromIdData(idData: CveIdData): this {

    return this.apply(idData);
  }

  updateFromRecordData(recordData: CveRecordData): this {

    return this.apply(recordData);
  }

  get hasAdp() {

    return this.adp.length > 0;
  }

  get hasCna() {

    return this.cna !== undefined;
  }

  get hasCveProgram() {

    return this.cveProgram !== undefined;
  }

  get hasSadp() {

    return this.sadp !== undefined;
  }

  get isPublished() {

    return this.state === 'PUBLISHED';
  }

  get isRejected() {

    return this.state == 'REJECTED';
  }

  get isReserved() {

    return this.state == 'RESERVED';
  }

  get cnaReferences() {

    return this.getReferences(this.references || []);
  }

  getReferences(references: Array<Reference>) {

    const regex = /^x_refsource/;

    return references.map((reference: Reference) => {

      // Skip tags starting with "x_refsource".

      const filteredTags =
        reference.tags?.filter((tag: string) => !regex.test(tag)) ?? [];

      const newReference: Reference = {
        ...reference,
        tags: filteredTags
      };

      if ((newReference.name?.length ?? 0) > 0) {
        const hostname = new URL(newReference.url).hostname.replace('www.', '');
        newReference.hostname = hostname
      }

      return newReference;
    });
  }

  productDisplayData(products: Array<AffectedProduct>) {

    const productDisplays: Array<ProductDisplay> = [];

    products.forEach((product) => {

      const productDisplay: ProductDisplay = {
        vendor: product.vendor,
        product: product.product,
        platforms: product.platforms ?? [],
        cpes: product.cpes ?? [],
        defaultStatus: product.defaultStatus ?? '',
        versionsColumns: []
      };

      if (productDisplay.product.length && productDisplay.product !== 'n/a')
        productDisplays.push(productDisplay);
    });

    return productDisplays;
  }

  versionDisplayData(versions: Array<Version>) {

    const versionDisplays: VersionTable = {
      headings: [],
      twoDTable: {}
    }

    const headings = new Set<string>();

    versions.forEach((version) => {

      const versionRange: VersionRange = {
        parentRange: ['at', version.version],
        parentStatus: version.status,
        changes: []
      };

      let limitVersion: string = 'unspecified';
      let preposition: string = 'before';

      if (version.lessThan) {

        limitVersion = version.lessThan;
      }
      else if (version.lessThanOrEqual) {

        limitVersion = version.lessThanOrEqual;
        preposition = 'through';
      }

      if (![version.version, 'unspecified', '*'].includes(limitVersion)) {

        versionRange.parentRange[0] = 'from';
        versionRange.parentRange.concat([preposition, limitVersion]);
      }

      version.changes?.forEach((change) => {

        versionRange.changes.push([change.status, 'from', change.at]);
      });

      headings.add(version.status);

      versionDisplays.twoDTable[version.status] ??= [];

      versionDisplays.twoDTable[version.status].push(versionRange);
    });

    versionDisplays.headings = [...headings].sort();

    return versionDisplays;
  }

  private applyCveIdData(idData: CveIdData): void {

    this.id = idData.cve_id;
    this.dateUpdated = idData.dateUpdated;
    this.owningCna = idData.owning_cna;
    this.state = idData.state;
  }

  private applyCveRecordData(cveRecord: CveRecordData): void {

    this.assignerOrgId = cveRecord.cveMetadata.assignerOrgId;
    this.assignerShortName = cveRecord.cveMetadata.assignerShortName ?? '';
    this.datePublished = Container.dateOnly(cveRecord.cveMetadata.datePublished
                                            ?? '');
    this.dateUpdated = cveRecord.cveMetadata.dateUpdated ?? '';
    this.descriptions = cveRecord.containers.cna.descriptions;
    this.id = cveRecord.cveMetadata.cveId;
    this.references = cveRecord.containers.cna.references;
    this.state = cveRecord.cveMetadata.state;
    this.cna = Container.fromJSON(cveRecord.containers.cna);
    this.cna.setRole('cna');
    this.adp = [];

    cveRecord.containers.adp?.forEach((adp: ContainerData) => {

      // The ADP containers are subdivided.  In this implementation, there
      // is only 1 CVE container, 1 ADP container if it's from CISA-ADP
      // (even though it's implemented as a list), and only 1 SADP container.

      const container = Container.fromJSON(adp);

      const shortName = container.shortName.toLowerCase();

      switch (shortName) {

        case 'cve':
          this.cveProgram = container;
          break;

        case 'cisa-adp':
          this.adp.push(container);
          break;

        default:
          if (shortName.endsWith('-sadp'))
            this.sadp = container;
          break;
      }
    });
  }

  private static isCveIdData(cveData: CveInput): cveData is CveIdData {
    return 'cve_id' in cveData;
  }
}
