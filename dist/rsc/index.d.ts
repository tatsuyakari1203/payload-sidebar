import { PayloadRequest, ServerProps } from 'payload';
import React from 'react';

type CustomNavProps = {
    req?: PayloadRequest;
} & ServerProps;
declare function CustomNav(props: CustomNavProps): Promise<React.ReactElement | null>;

export { CustomNav, type CustomNavProps };
