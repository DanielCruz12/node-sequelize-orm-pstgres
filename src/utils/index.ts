export const formatFormResponse = ({
    id,
    name,
    description,
    isRecommended,
    icon,
    isApproved,
    category,
    slug,
    aiPrompt,
    fields,
  }: any) => ({
    icon,
    name,
    isApproved,
    description,
    isRecommended,
    id,
    category,
    slug,
    aiPrompt,
    form: fields.map(formatFieldResponse),
  })
  
  export const formatFieldResponse = ({
    id,
    label,
    fieldType,
    name,
    required,
    placeholder,
  }: any) => ({
    id,
    label,
    field: fieldType,
    name,
    required,
    placeholder,
  })