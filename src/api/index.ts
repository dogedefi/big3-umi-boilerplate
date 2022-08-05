import { fusibleRequest } from '@/utils/fusibleRequest';

export const PREFIX = `${process.env.EKS}/api/ugc-gateway/ugc/public/v1`;
export const PREFIX_PRIVATE = `${process.env.EKS}/api/ugc-gateway/ugc/private/v1`;

export let apiHeaders = {};

export interface PaginationProps {
    orderBy?: string;
    pageNum: number;
    pageSize: number;
}
