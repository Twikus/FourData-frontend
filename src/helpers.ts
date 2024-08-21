import { useCookies } from "vue3-cookies";

export function validateEmail(email: string) {
  const EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return EmailRegex.test(email);
}

export function suffixDomain() {
  let suffix = '';
  if(import.meta.env.VITE_ENV != 'production') {
    suffix = '_' + import.meta.env.VITE_ENV;
  }

  return suffix;
}

export function authCheck() {
  const { cookies } = useCookies();

  if(cookies.get(`auth${suffixDomain()}`) && cookies.get(`auth${suffixDomain()}`) != '') {
    return true;
  }

  return false;
}

export function displayError(e: any) {
  if (import.meta.env.VITE_ENV == 'local') {
    console.log('Error: ', e);
  }
}

export function getToken() {
  const { cookies } = useCookies();
  return cookies.get(`auth${suffixDomain()}`);
}

export function getStatus(status: boolean) {
  if (typeof status === 'boolean') {
    return status ? 'Ouverte' : 'Fermée';
  } else {
    return status;
  }
}

export function getSeverity(status: string) {
  switch (status) {
  case 'Ouverte':
      return 'success';
  case 'Fermée':
      return 'danger';
  default:
      return 'info';
  }
}

export function copyItem(item: any) {
  navigator.clipboard.writeText(item);

  const event = new CustomEvent('copy-success');
  window.dispatchEvent(event);
}
