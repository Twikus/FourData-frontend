import { defineStore } from 'pinia';
import { getToken, displayError, getStatus } from '@/helpers';
import axiosClient from '@/plugins/axios';

import type { Company, Siren, Siret } from '@/interfaces/company';
import { addEvent } from '@/events';

export const useCompanyStore = defineStore('company', {
    state: () => ({
        companies: [] as Company[]
    }),
    getters: {},
    actions: {
        async fetchCompanies() {
            const token = getToken();

            try {
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
        },
        async createCompany(siren?: number, siret?: number) {
            let params = {};
            
            const token = getToken();

            if (siren) {
                params = {
                    siren: siren,
                };
            } else {
                params = {
                    siret: siret,
                };
            }

            try {
                const response = await axiosClient.post('companies', params, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                response.data.status = getStatus(response.data.status);
                this.companies.unshift(response.data);

                addEvent('create-company-success');
            } catch (error: any) {
                displayError(error);

                if (error.response.status === 400 && error.response.data.error === 'Company already exists') {
                    addEvent('create-company-already-exists');
                } else if (error.response.status === 400 && error.response.data.error === 'Company not found') {
                    addEvent('create-company-not-found');
                }
            }
        },
        async updateCompany(params: Company) {
            params.status = params.status === 'Ouverte' ? true : false;

            try {
                const token = getToken();

                const response = await axiosClient.put(`companies/${params.id}`, params, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                response.data.status = getStatus(response.data.status);

                const index = this.companies.findIndex((company) => company.id === response.data.id);
                this.companies[index] = response.data;

                addEvent('update-company-success');
            } catch (error) {
                displayError(error);
            }
        },
        async deleteCompany(id: number) {
            try {
                const token = getToken();

                await axiosClient.delete(`companies/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                this.companies = this.companies.filter((company) => company.id !== id);

                addEvent('remove-company-success');
            } catch (error) {
                displayError(error)
            }
        }
    },
});