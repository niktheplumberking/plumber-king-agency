// Static flow-line files for <FlowLines> (see components/ui/flowLines.ts).
import type { APIRoute, GetStaticPaths } from 'astro';
import { FLOW_FILES, flowName, flowSvg, type FlowVariant } from '../../components/ui/flowLines';

export const getStaticPaths: GetStaticPaths = () =>
  FLOW_FILES.map(([variant, opacity]) => ({ params: { name: flowName(variant, opacity) }, props: { variant, opacity } }));

export const GET: APIRoute = ({ props }) =>
  new Response(flowSvg(props.variant as FlowVariant, props.opacity as number), { headers: { 'Content-Type': 'image/svg+xml' } });
