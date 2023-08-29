import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher';

export function useContacts() {
    const {data, error, mutate, isLoading} = useSWR('/api/contacts', fetcher);

    return {
        contacts: data?.data,
        isLoading,
        isError: error,
        mutate
    }
}