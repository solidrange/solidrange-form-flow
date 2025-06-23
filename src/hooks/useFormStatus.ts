
import { useState } from "react";

export type FormStatus = 'draft' | 'published';

export interface FormStatusHook {
  status: FormStatus;
  isPublished: boolean;
  isDraft: boolean;
  publishForm: () => void;
  setToDraft: () => void;
  canEdit: boolean;
}

export const useFormStatus = (initialStatus: FormStatus = 'draft'): FormStatusHook => {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  const publishForm = () => setStatus('published');
  const setToDraft = () => setStatus('draft');

  return {
    status,
    isPublished: status === 'published',
    isDraft: status === 'draft',
    publishForm,
    setToDraft,
    canEdit: status === 'draft'
  };
};
