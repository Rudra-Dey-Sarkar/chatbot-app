import React from 'react'
import TestIntegration from '../../../../components/TestIntegration/TestIntegration';

function IntegrationCase({
    params: { caseId },
}: {
    params: { caseId: string };
}) {
    return (
        <div>
             <TestIntegration caseId={caseId} />
        </div>
    )
}

export default IntegrationCase