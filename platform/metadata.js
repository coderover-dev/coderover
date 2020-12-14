export class ProjectMetadata {
  name: string = null;
  workspace: string = null;
  location: string = null;
  type: string = null;
  platform: string = null;
  framework: string = null;
  models: DataModelMetadata[] = [];
  resources: ResourceMetadata[] = [];
}

export class DataModelMetadata {
  name: string = null;
  transient: boolean = false;
  dataFields: DataFieldMetadata[] = [];
}

export class DataFieldMetadata {
  fieldName: string = null;
  dbColumnName: string = null;
  nullable: boolean = false;
  unique: boolean = false;
  transient: boolean = false;
  docText: string = false;
}

export class ResourceMetadata {
  name: string = null;
  dataModel: DataModelMetadata = null;
  operations: ResourceOperationMetadata[] = [];
}

export class ResourceOperationMetadata {
  name: string = null;
  method: string = null;
  path: string = null;
  queryParams: ResourceOperationParamMetadata[] = [];
  pathParams: ResourceOperationParamMetadata[] = [];
}

export class ResourceOperationParamMetadata {
  name: string = null;
  value: string = null;
}