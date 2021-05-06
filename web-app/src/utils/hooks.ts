import { TypedDispatch } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

export const useTypedDispatch: () => TypedDispatch = useDispatch;

export const useTypedSelector: <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected = useSelector;

