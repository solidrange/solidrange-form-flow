
import { useState } from 'react';

export type FormStatus = 'draft' | 'published';

export const useFormStatus = (initialStatus: FormStatus = 'draft') => {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  const publishForm = () => setStatus('published');
  const saveToDraft = () => setStatus('draft');
  const isDraft = status === 'draft';
  const isPublished = status === 'published';

  return {
    status,
    publishForm,
    saveToDraft,
    isDraft,
    isPublished
  };
};
