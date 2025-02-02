"use client"
import React, { useEffect } from 'react'
import TestIntegration from '../../../../components/TestIntegration/TestIntegration';
type PageProps = {
    params: Promise<{ caseId: string }>;
};
function IntegrationCase({
    params,
}: PageProps) {
    const [caseId, setCaseId] = React.useState<string | null>(null);

    if (!caseId) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <TestIntegration caseId={caseId} />
            </div>
        )
    }
}

export default IntegrationCase