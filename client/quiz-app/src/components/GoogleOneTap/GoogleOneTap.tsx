import { useEffect, useRef } from "react";

const GoogleOneTap = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && divRef.current) {
      window.google.accounts.id.initialize({
        client_id: "159952968255-7qk4l7hcpvvsti5h2ilkihtnvvoc0aif.apps.googleusercontent.com", // Replace with your real client ID
        callback: (response: any) => {
          // Send the credential to your backend
          fetch('/api/googleLogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
          })
           .then(res => {
              if (!res.ok) throw new Error('Login failed');
              return res.json();
            })
            .then(data => {
              // Handle successful login (e.g., save token, redirect, etc.)
              console.log('Login successful:', data);
            })
            .catch(error => {
              // Handle error (e.g., show error message)
              console.error('Error during login:', error);
            });
        },
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
      });
      window.google.accounts.id.prompt();
    }
  }, []);

  return <div ref={divRef}></div>;
};

export default GoogleOneTap;