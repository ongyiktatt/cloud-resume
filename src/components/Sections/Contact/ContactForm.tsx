import {FC, memo, useCallback, useMemo, useRef, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import {contactVerifyUrl, recaptchaSiteKey} from '../../../config';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;

      const fieldData: Partial<FormData> = {[name]: value};

      setData({...data, ...fieldData});
    },
    [data],
  );

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const token = recaptchaRef.current?.getValue();

      if (!token) {
        setStatus('error');
        return;
      }

      setStatus('submitting');

      try {
        if (!contactVerifyUrl) {
          // No verification endpoint configured yet. Log so the form still works in local development.
          console.warn('NEXT_PUBLIC_CONTACT_VERIFY_URL is not set. Skipping server-side reCAPTCHA verification.');
        } else {
          const response = await fetch(contactVerifyUrl, {
            body: JSON.stringify({...data, token}),
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
          });

          const result = (await response.json()) as {success?: boolean};

          if (!response.ok || !result.success) {
            throw new Error('reCAPTCHA verification failed');
          }
        }

        /**
         * The reCAPTCHA token was verified server-side (when an endpoint is configured).
         * This is a good starting point to wire up your form submission logic
         * */
        console.log('Data to send: ', data);
        setData(defaultData);
        setStatus('success');
      } catch {
        setStatus('error');
      } finally {
        // reCAPTCHA tokens are single-use, so always reset the widget after an attempt.
        recaptchaRef.current?.reset();
      }
    },
    [data, defaultData],
  );

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return (
    <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" onSubmit={handleSendMessage}>
      <input className={inputClasses} name="name" onChange={onChange} placeholder="Name" required type="text" />
      <input
        autoComplete="email"
        className={inputClasses}
        name="email"
        onChange={onChange}
        placeholder="Email"
        required
        type="email"
      />
      <textarea
        className={inputClasses}
        maxLength={250}
        name="message"
        onChange={onChange}
        placeholder="Message"
        required
        rows={6}
      />
      <div className="w-max overflow-hidden rounded-md">
        <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaSiteKey} theme="dark" />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          Please complete the reCAPTCHA and try again.
        </p>
      )}
      {status === 'success' && (
        <p className="text-sm text-green-400" role="status">
          Thanks! Your message has been sent.
        </p>
      )}
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={status === 'submitting'}
        type="submit">
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
