import type { TypedDispatch } from 'types';
import React from 'react';

export type ActionButton = {
  key: string;
  label: string;
  onClick: (dispatch: TypedDispatch, id: string) => void;
};

export type ModalData = {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  modalButtons: ActionButton[];
  closeOnEsc?: boolean;
  closeOnOverlayClick: boolean;
  closeOnSelection: boolean;
  dataCyIdentifier?: string;
};
