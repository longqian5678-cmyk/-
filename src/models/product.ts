export interface ProductData {
  collectionURL?: string;
  cpes?: Array<string>;
  defaultStatus?: Status;
  modules?: Array<string>;
  packageName?: string;
  platforms?: Array<string>;
  product?: string;
  programFiles?: Array<string>;
  programRoutines?: Array<ProgramRoutine>;
  repo?: string;
  vendor?: string;
  versions?: Array<VersionData>;
}

interface Change {
  at: string;
  status: Status;
}

interface ProgramRoutine {
  name: string;
}

interface VersionData {
  changes?: Array<Change>;
  lessThan?: string;
  lessThanOrEqual?: string;
  status: Status;
  version: string;
  versionType?: string;
}

interface Version {
  changes: Array<Change>;
  lessThan: string;
  lessThanOrEqual: string;
  status: Status;
  version: string;
  versionType: string;
}

interface VersionRange {

  parentRange: Array<VersionSpecifier>;
  changes: Array<Change>;
}

interface VersionSpecifier {
  preposition: string;
  version: string;
}

interface VersionTable {

  headings: Array<string>;
  twoDTable: Record<string, Array<VersionRange>>;
}

enum Status {
  Affected = 'affected',
  Unaffected = 'unaffected',
  Unknown = 'unknown'
}

export class Product {

  collectionURL: string;
  cpes: Array<string>;
  defaultStatus: Status | string;
  modules: Array<string>;
  packageName: string;
  platforms: Array<string>;
  product: string;
  programFiles: Array<string>;
  programRoutines: Array<ProgramRoutine>;
  repo: string;
  vendor: string;
  versionTable: VersionTable;

  constructor(data: ProductData) {

    this.collectionURL = data.collectionURL ?? '';
    this.cpes = data.cpes ?? [];
    this.defaultStatus = data.defaultStatus ?? Status.Unknown;
    this.modules = data.modules ?? [];
    this.packageName = data.packageName ?? '';
    this.platforms = data.platforms ?? [];
    this.product = data.product ?? '';
    this.programFiles = data.programFiles ?? [];
    this.programRoutines = data.programRoutines ?? [];
    this.repo = data.repo ?? '';
    this.vendor = data.vendor ?? '';
    this.versionTable = this.versionDisplayData(data.versions);

    if (!this.versionTable && this.defaultStatus !== Status.Unknown)
      this.defaultStatus = `All versions are ${this.defaultStatus}`;
  }

  get hasData(): boolean {

    // The container has no product if the vendor, package name, and product
    // fields are either empty or contain 'n/a'.

    const fields: Array<string> = [this.vendor, this.packageName, this.product];

    return fields.some(f => !['', 'n/a'].includes(f.toLowerCase()));
  }

  get hasOnlyPackage(): boolean {

    return this.product.length == 0 && this.packageName.length > 0;
  }

  get name(): string {

    return this.product ? this.product : this.packageName;
  }

  get nameLabel(): string {

    return this.product ? 'Product' : 'Package';
  }

  get versionCount(): number {

    return Object.values(this.versionTable.twoDTable)
      .reduce((total, ranges) => total + ranges.length, 0);
  }

  versionDisplayData(versions?: Array<VersionData>): VersionTable {

    const versionDisplays: VersionTable = {
      headings: [],
      twoDTable: {}
    }

    if (!versions)
      return versionDisplays;

    const headings = new Set<string>();

    versions.forEach((version) => {

      if (version.version == 'n/a')
        return;

      const initialVersion: VersionSpecifier = {
        preposition: 'at',
        version: version.version
      };

      const versionRange: VersionRange = {
        parentRange: [initialVersion],
        changes: version.changes ?? []
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

        initialVersion.preposition = 'from';

        const endVersion: VersionSpecifier = {
          preposition: preposition,
          version: limitVersion
        };

        versionRange.parentRange.push(endVersion);
      }

      headings.add(version.status);

      versionDisplays.twoDTable[version.status] ??= [];

      versionDisplays.twoDTable[version.status].push(versionRange);
    });

    versionDisplays.headings = [...headings].sort();

    return versionDisplays;
  }
}
