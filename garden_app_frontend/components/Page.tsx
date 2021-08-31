import React, { ReactChildren, ReactChild } from 'react';

import NewHeader from './NewHeader';

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NewHeader></NewHeader>
            {children}
        </>
    );
}
