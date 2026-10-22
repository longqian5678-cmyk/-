// These are the data structures related to the CVE container objects.  Most
// of the structures follow directly from the published schema, but some have
// additional fields used for implementing the website user interface, while
// others may be missing fields from the schema because they are not used
// in any website code.

import {Product} from "./product"
import type {ProductData} from "./product"

export interface ContainerData {
  providerMetadata: ProviderMetaData;
  dateAssigned?: string;
  datePublic?: string;
  title?: string;
  descriptions?: Array<Description>;
  affected?: Array<ProductData>;
  problemTypes?: Array<any>;
  references?: Array<Reference>;
  impacts?: Array<any>;
  metrics?: Array<any>;
  configurations?: Array<any>;
  workarounds?: Array<any>;
  solutions?: Array<any>;
  exploits?: Array<any>;
  timeline?: Array<any>;
  credits?: Array<any>;
  source?: any;
  tags?: Array<string>;
  taxonomyMappings?: Array<any>;
}

enum CreditRole {
  Analyst = 'analyst',
  Coordinator = 'coordinator',
  Finder = 'finder',
  Other = 'other',
  Reporter = 'reporter',
  RemediationDeveloper = 'remediation developer',
  RemediationReviewer = 'remediation reviewer',
  RemediationVerifier = 'remediation verifier',
  Sponsor = 'sponsor',
  Tool = 'tool'
}

interface Credit {
  lang: string;
  value: string;
  user: string;
  type: CreditRole;
}

interface Description {
  lang: string;
  value: string;
  supportingMedia?: Array<Media>;
}

interface Media {
  type: string;
  base64?: boolean;
  value: string;
}

interface ProviderMetaData {
  orgId: string;
  shortName?: string;
  dateUpdated?: string;

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

interface Reference {
  hostname?: string;
  name?: string;
  tags?: Array<string>;
  url: string;
}

interface CvssMetricSubset {
  baseScore?: number;
  baseSeverity?: string;
  vectorString?: string;
  version?: string;
}

interface KevOtherMetric {
  type: 'KEV';
  content: Kev;
}

interface SsvcOtherMetric {
  type: 'ssvc';
  content: Ssvc;
}

interface OtherOtherMetric {
  type: string;
  content: any;
}

type OtherMetric = KevOtherMetric | OtherOtherMetric;

type CvssKey = 'cvssV2_0' | 'cvssV3_0' | 'cvssV3_1' | 'cvssV4_0';

interface Metric {
  cvssV2_0?: CvssMetricSubset;
  cvssV3_0?: CvssMetricSubset;
  cvssV3_1?: CvssMetricSubset;
  cvssV4_0?: CvssMetricSubset;
  format?: string;
  other?: OtherMetric;
  scenarios?: Array<any>;
}

interface Cvss {
  baseScore: string;
  baseSeverity: string;
  baseSeverityColorClass: string;
  version: string;
  vectorString: string;
}

interface Cwe {
  cweId?: string;
  cweNumber: number;
  description: string;
  lang?: string;
  type?: string;
}

interface ProblemType {
  descriptions: Array<Cwe>;
}

interface Kev {
  dateAdded: string;
  reference: string;
}

enum Exploitation {
  Active = 'active',
  None = 'none',
  Poc = 'poc',
  PublicPoc = 'public poc'
}

enum TechnicalImpact {
  Partial = 'partial',
  Total = 'total'
}

enum Role {
  Adp = 'adp',
  Cna = 'cna',
  CveProgram = 'cve',
  Sadp = 'sadp',
  Unspecified = 'unspecified'
}

interface Ssvc {
  id: string;
  options: any;
  role: string;
  timestamp: string;
  version: string;
  automatable: string;
  exploitation: string;
  'technical impact': string;
}


export class Container {

  // This is the implementation of the CVE container, which may be either
  // a CNA or ADP.

  affected: Array<Product> = [];
  configurations: Array<any> = [];
  credits: Array<Credit> = [];
  cvsss: Array<Cvss> = [];
  cwes: Array<Cwe> = [];
  dateAssigned: string = '';
  datePublic: string = '';
  dateUpdated: string = '';
  descriptions: Array<Description> = [];
  exploits: Array<any> = [];
  impacts: Array<any> = [];
  kevs: Array<Kev> = [];
  metrics: Array<Metric> = [];
  orgId: string = '';
  problemTypes: Array<ProblemType> = [];
  references: Array<Reference> = [];
  role: Role = Role.Unspecified;
  shortName: string = '';
  solutions: Array<any> = [];
  source: any = undefined;
  ssvcs: Array<Ssvc> = [];
  tags: Array<string> = [];
  taxonomyMappings: Array<any> = [];
  timeline: Array<any> = [];
  title: string = '';
  workarounds: Array<any> = [];

  constructor(data?: ContainerData, roleName?: string) {

    if (!data)
      return;

    this.affected = this.parseProducts(data.affected);
    this.configurations = data.configurations ?? [];
    this.credits = (data.credits !== undefined)
      ? this.parseCredits(data.credits) : [];
    this.cwes = (data.problemTypes !== undefined)
      ? this.getCwes(data.problemTypes) : [];
    this.dateAssigned = data.dateAssigned ?? '';
    this.datePublic = data.datePublic ?? '';
    this.dateUpdated = data.providerMetadata.dateUpdated
      ? Container.dateOnly(data.providerMetadata.dateUpdated) : '';
    this.descriptions = data.descriptions ?? [];
    this.exploits = data.exploits ?? [];
    this.impacts = data.impacts ?? [];
    this.metrics = data.metrics ?? [];
    this.orgId = data.providerMetadata.orgId;
    this.problemTypes = data.problemTypes ?? [];
    this.references = (data.references !== undefined)
      ? this.getReferences(data.references) : [];
    this.shortName = data.providerMetadata.shortName ?? '';
    this.solutions = data.solutions ?? [];
    this.source = data.source;
    this.tags = data.tags ?? [];
    this.taxonomyMappings = data.taxonomyMappings ?? [];
    this.timeline = data.timeline ?? [];
    this.title = data.title ?? '';
    this.workarounds = data.workarounds ?? [];

    this.parseMetrics();
    this.setRole(roleName);
  }

  parseCredits(credits: Array<any>) {

    const newCredits = credits.map((credit) => {

      const newCredit: Credit = {...credit};

      if (credit.user === undefined)
        newCredit.user = '';

      newCredit.type = Object.values(CreditRole).includes(credit.type as CreditRole)
        ? credit.type as CreditRole : CreditRole.Other;

      return newCredit;
    });

    return newCredits;
  }

  parseProducts(products?: Array<ProductData>) {

    const newProducts: Array<Product> = products?.flatMap((product: ProductData) => {

      const newProduct = new Product(product);

      // We're only adding a product if it has actual data.

      return newProduct.hasData ? [newProduct] : [];
    }) || [];

    return newProducts;
  }

  parseMetrics() {

    this.metrics.forEach((metric: Metric) => {

      // The type of metric is either in the optional "other" field, or for
      // CVSS there is one of a set of keys indicating the CVSS version.

      switch (metric.other?.type) {

        case 'kev':

          this.kevs.push(metric.other.content as Kev);
          return;

        case 'ssvc':

          this.parseSsvc(metric.other as SsvcOtherMetric);
          return;
      }

      // The object is neither KEV or SSVC.  If it's a CVSS, it must contain
      // a CVSS version field.

      const cvssRegex = /^cvssV(?:2_0|3_(?:0|1)|4_0)$/i;

      const cvssKey = Object.keys(metric).find(key => cvssRegex.test(key));

      if (!cvssKey)
        return;

      // This is a CVSS object.  We copy the contents from the current
      // object and add the "base severity color class".

      const cvssData = metric[cvssKey as CvssKey] as CvssMetricSubset;

      const cvss: Cvss = {
        baseScore: cvssData.baseScore?.toFixed(1) || '-',
        baseSeverity: '-',
        baseSeverityColorClass: 'is-white',
        version: cvssData.version || '-',
        vectorString: cvssData.vectorString || '-'
      };

      if (cvssData.baseSeverity) {

        cvss.baseSeverity = cvssData.baseSeverity;

        switch (cvss.baseSeverity.toLowerCase()) {

          case 'critical':
          case 'high':

            cvss.baseSeverityColorClass = 'is-danger';
            break;

          case 'medium':

            cvss.baseSeverityColorClass ='is-warning';
            break;

          case 'low':

            cvss.baseSeverityColorClass = 'is-info';
        }
      }

      this.cvsss.push(cvss);
    });
  }

  parseSsvc(ssvcMetric: SsvcOtherMetric) {

    let automatable = '-';
    let exploitation = '-';
    let technicalImpact = '-';

    // There may not exist an options array - the schema is not defined for
    // content.  The options array is almost always present, but CVE-2024-7344
    // has "selections" instead (in the CNA container).

    ssvcMetric.content.options?.forEach((option: Record<string, string>) => {

      const keys: Array<string> = Object.keys(option);

      keys.forEach((key: string) => {

        const value: string = option[key];

        switch (key.toLowerCase()) {

          case 'automatable':

            automatable = value;
            break;

          case 'exploitation':

            if (Object.values(Exploitation).includes(value as Exploitation))
              exploitation = value;
            break;

          case 'technical impact':

            if (Object.values(TechnicalImpact).includes(value as TechnicalImpact))
              technicalImpact = value;
            break;
        }
      });
    });

    const ssvc: Ssvc = {
      id: ssvcMetric.content.id,
      options: ssvcMetric.content.options,
      role: ssvcMetric.content.role,
      timestamp: ssvcMetric.content.timestamp
        ? Container.dateOnly(ssvcMetric.content.timestamp) : '',
      version: ssvcMetric.content.version,
      automatable: automatable,
      exploitation: exploitation,
      'technical impact': technicalImpact
    };

    this.ssvcs.push(ssvc);
  }

  getCwes(problemTypes: Array<ProblemType>) {

    // We're traversing the CWE objects that are contained in
    // problemTypes[*].descriptions[*].  Since each object in the problemTypes
    // list must contain the "descriptions" field, it's easier to traverse
    // the CWE objects by flattening the lists.

    const problemDescriptions = problemTypes.flatMap(pT => pT.descriptions);

    // CWEs are identified by one of the following conditions: the (required)
    // description has the CWE ID at the beginning, the type field is "CWE",
    // or the cweId field contains a CWE ID.

    const cweIdRegex = /^CWE-(?<id>\d+)$/i;

    const descRegex = /^CWE-(?<id>\d+)\s*:?\s*(?<desc>.*)$/i;

    // The "type" field isn't required, but if it exists it should be "cwe".
    // Othewise, the description must match the regular expression.  Any
    // objects that don't match are ignored.

    const validCwes = problemDescriptions
      .filter((cwe: Cwe) => cwe.type?.toLowerCase() === 'cwe'
              || descRegex.test(cwe.description)
              || (typeof cwe.cweId === 'string' && cweIdRegex.test(cwe.cweId)))
      .map((cwe: Cwe) => {

        const newCwe: Cwe = {...cwe};

        const match = descRegex.exec(cwe.description);

        if (match?.groups) {

          // The CWE ID is included at the beginning of the description.
          // Remove it from the description; otherwise, it's displayed
          // twice and is redundant.

          if (!newCwe.cweId)
            newCwe.cweId = `CWE-${match.groups.id}`;

          newCwe.cweNumber = parseInt(match.groups.id);

          newCwe.description = match.groups.desc;
        }
        else if (newCwe.cweId) {

          // The description doesn't contain the CWE ID, but it is in the
          // "cweId" field.

          const match = cweIdRegex.exec(newCwe.cweId);

          newCwe.cweNumber = parseInt(match?.groups?.id ?? '0');
        }
        else {

          // We indicate that there's no valid CWE by using zero as
          // the CWE number (there is no CWE-0).

          newCwe.cweNumber = 0;
        }

        return newCwe;
      })
      .sort((cwe1: Cwe, cwe2: Cwe) => cwe1.cweNumber - cwe2.cweNumber);

      return validCwes;
  }

  getReferences(references: Array<Reference>) {

    const regex = /^x_refsource/;

    return references.map((reference: Reference) => {

      // Skip tags starting with 'x_refsource'.

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

  setRole(roleName?: string) {

    // This function sets the role name for the container.  Because the
    // CNA container is stored apart from the ADP containers, it must be
    // identified by specifying "cna" as the roleName.  If the role name
    // is not supplied, the role is assumed to be an ADP and is determined
    // by the container data.

    this.role = Object.values(Role).includes(roleName as Role)
      ? roleName as Role : Role.Unspecified;

    if (this.role == Role.Unspecified) {

      if (this.shortName.toUpperCase().endsWith('-SADP'))
        this.role = Role.Sadp;
      else if (this.shortName.toUpperCase() === 'CVE')
        this.role = Role.CveProgram;
      else
        this.role = Role.Adp;
    }
  }

  get englishDescription() {

    for (const description of this.descriptions) {

      if (description.lang.toLowerCase().startsWith('en'))
        return description.value;
    }

    return '';
  }

  get isAdp() {

    return this.role === Role.Adp;
  }

  get isCna() {

    return this.role === Role.Cna;
  }

  get isCnaOrSadp() {

    return this.isCna || this.isSadp;
  }

  get isCveProgram() {

    return this.role === Role.CveProgram;
  }

  get isSadp() {

    return this.role === Role.Sadp;
  }

  static dateOnly(timestamp: string): string {

    // This strips the time information from a timestamp string, leaving
    // only the date.

    return timestamp.split('T')[0];
  }

  static fromJSON(data: ContainerData): Container {

    return new Container(data);
  }
}
