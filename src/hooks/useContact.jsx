import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher';

export function useContact({id}) {
    const {data, error, mutate, isLoading} = useSWR(`/api/contacts/${id}`, fetcher);

    return {
        contact: data?.data,
        isLoading,
        isError: error,
        mutate
    }
}