import _ from 'lodash';

export function append(processorApiDocument) {
  return {
    append: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      value: processorApiDocument.values
    }
  };
}

export function convert(processorApiDocument) {
  const types = {
    //<kibana type>: <ingest type>,
    auto: 'auto',
    number: 'float',
    string: 'string',
    boolean: 'boolean'
  };

  const processor = {
    convert: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      type: types[processorApiDocument.type]
    }
  };
  if (!_.isEmpty(processorApiDocument.target_field)) {
    processor.convert.target_field = processorApiDocument.target_field;
  }

  return processor;
}

export function gsub(processorApiDocument) {
  return {
    gsub: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.source_field,
      pattern: processorApiDocument.pattern,
      replacement: processorApiDocument.replacement
    }
  };
}

export function set(processorApiDocument) {
  return {
    set: {
      tag: processorApiDocument.processor_id,
      field: processorApiDocument.target_field,
      value: processorApiDocument.value
    }
  };
}