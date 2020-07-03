// package: activities_v1
// file: activities_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class Reference extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getType(): string;
  setType(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Reference.AsObject;
  static toObject(includeInstance: boolean, msg: Reference): Reference.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Reference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Reference;
  static deserializeBinaryFromReader(message: Reference, reader: jspb.BinaryReader): Reference;
}

export namespace Reference {
  export type AsObject = {
    id: string,
    type: string,
    name: string,
  }
}

export class PartyActivity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTime(): string;
  setTime(value: string): void;

  getType(): string;
  setType(value: string): void;

  hasParty(): boolean;
  clearParty(): void;
  getParty(): Reference | undefined;
  setParty(value?: Reference): void;

  hasRefItem(): boolean;
  clearRefItem(): void;
  getRefItem(): Reference | undefined;
  setRefItem(value?: Reference): void;

  clearRefParentsList(): void;
  getRefParentsList(): Array<Reference>;
  setRefParentsList(value: Array<Reference>): void;
  addRefParents(value?: Reference, index?: number): Reference;

  hasRefParty(): boolean;
  clearRefParty(): void;
  getRefParty(): Reference | undefined;
  setRefParty(value?: Reference): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  getOrgId(): string;
  setOrgId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivity.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivity): PartyActivity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivity;
  static deserializeBinaryFromReader(message: PartyActivity, reader: jspb.BinaryReader): PartyActivity;
}

export namespace PartyActivity {
  export type AsObject = {
    id: string,
    time: string,
    type: string,
    party?: Reference.AsObject,
    refItem?: Reference.AsObject,
    refParentsList: Array<Reference.AsObject>,
    refParty?: Reference.AsObject,
    detailsMap: Array<[string, string]>,
    orgId: string,
  }
}

export class PartyActivityPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<PartyActivity>;
  setDataList(value: Array<PartyActivity>): void;
  addData(value?: PartyActivity, index?: number): PartyActivity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivityPage.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivityPage): PartyActivityPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivityPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivityPage;
  static deserializeBinaryFromReader(message: PartyActivityPage, reader: jspb.BinaryReader): PartyActivityPage;
}

export namespace PartyActivityPage {
  export type AsObject = {
    total: number,
    dataList: Array<PartyActivity.AsObject>,
  }
}

export class PartyActivityPageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): PagingParams | undefined;
  setPaging(value?: PagingParams): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivityPageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivityPageRequest): PartyActivityPageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivityPageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivityPageRequest;
  static deserializeBinaryFromReader(message: PartyActivityPageRequest, reader: jspb.BinaryReader): PartyActivityPageRequest;
}

export namespace PartyActivityPageRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
    paging?: PagingParams.AsObject,
  }
}

export class PartyActivityPageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): PartyActivityPage | undefined;
  setPage(value?: PartyActivityPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivityPageReply.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivityPageReply): PartyActivityPageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivityPageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivityPageReply;
  static deserializeBinaryFromReader(message: PartyActivityPageReply, reader: jspb.BinaryReader): PartyActivityPageReply;
}

export namespace PartyActivityPageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: PartyActivityPage.AsObject,
  }
}

export class PartyActivityLogRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasActivity(): boolean;
  clearActivity(): void;
  getActivity(): PartyActivity | undefined;
  setActivity(value?: PartyActivity): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivityLogRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivityLogRequest): PartyActivityLogRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivityLogRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivityLogRequest;
  static deserializeBinaryFromReader(message: PartyActivityLogRequest, reader: jspb.BinaryReader): PartyActivityLogRequest;
}

export namespace PartyActivityLogRequest {
  export type AsObject = {
    correlationId: string,
    activity?: PartyActivity.AsObject,
  }
}

export class PartyActivityObjectReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasActivity(): boolean;
  clearActivity(): void;
  getActivity(): PartyActivity | undefined;
  setActivity(value?: PartyActivity): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivityObjectReply.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivityObjectReply): PartyActivityObjectReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivityObjectReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivityObjectReply;
  static deserializeBinaryFromReader(message: PartyActivityObjectReply, reader: jspb.BinaryReader): PartyActivityObjectReply;
}

export namespace PartyActivityObjectReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    activity?: PartyActivity.AsObject,
  }
}

export class PartyActivityBatchRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  clearActivitiesList(): void;
  getActivitiesList(): Array<PartyActivity>;
  setActivitiesList(value: Array<PartyActivity>): void;
  addActivities(value?: PartyActivity, index?: number): PartyActivity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivityBatchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivityBatchRequest): PartyActivityBatchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivityBatchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivityBatchRequest;
  static deserializeBinaryFromReader(message: PartyActivityBatchRequest, reader: jspb.BinaryReader): PartyActivityBatchRequest;
}

export namespace PartyActivityBatchRequest {
  export type AsObject = {
    correlationId: string,
    activitiesList: Array<PartyActivity.AsObject>,
  }
}

export class PartyActivityDeleteRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivityDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivityDeleteRequest): PartyActivityDeleteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivityDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivityDeleteRequest;
  static deserializeBinaryFromReader(message: PartyActivityDeleteRequest, reader: jspb.BinaryReader): PartyActivityDeleteRequest;
}

export namespace PartyActivityDeleteRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
  }
}

export class PartyActivityOnlyErrorReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartyActivityOnlyErrorReply.AsObject;
  static toObject(includeInstance: boolean, msg: PartyActivityOnlyErrorReply): PartyActivityOnlyErrorReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartyActivityOnlyErrorReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartyActivityOnlyErrorReply;
  static deserializeBinaryFromReader(message: PartyActivityOnlyErrorReply, reader: jspb.BinaryReader): PartyActivityOnlyErrorReply;
}

export namespace PartyActivityOnlyErrorReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
  }
}

