import { FC } from 'react';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC<{userName:string}> = ({userName}) => <AppHeaderUI userName={userName} />;
