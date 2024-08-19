import { defineStore } from 'pinia';
import { getToken, displayError, getStatus } from '@/helpers';
import axiosClient from '@/plugins/axios';

import type { Company } from '@/interfaces/company';

export const useCompanyStore = defineStore('company', {
    state: () => ({
        companies: [] as Company[]
    }),
    getters: {},
    actions: {
        async fetchCompanies() {
            try {
                const token = getToken();

                const response = await axiosClient.get('companies', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.companies = response.data;

                this.companies = this.companies.map((company) => {
                    return {
                        ...company,
                        status: typeof company.status === 'boolean' ? getStatus(company.status) : company.status,
                    };
                });
            
                return response.data;
            } catch (error) {
                displayError(error);
            }
        }
    },
});