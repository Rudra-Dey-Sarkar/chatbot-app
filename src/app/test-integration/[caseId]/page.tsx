"use client"
import React, { useEffect, useState } from 'react'
import TestIntegration from '../../../../components/TestIntegration/TestIntegration';
type PageProps = {
    params: Promise<{ caseId: string }>;
};
function IntegrationCase({params}: PageProps) {
    const [caseId, setCaseId] = useState<string | null>(null);

    useEffect(() => {
      async function fetchParams() {
        const resolvedParams = await params;
        setCaseId(resolvedParams.caseId);
      }
  
      fetchParams();
    }, [params]);
  
    return (
      <div>
        {caseId ? <TestIntegration caseId={caseId} /> : <p>Loading...</p>}
      </div>
    );

}

export default IntegrationCase