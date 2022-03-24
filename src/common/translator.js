const translations = {
  'Invalid credentials': 'Credenziali non valide',
  'The email has already been taken.': "L'e-mail è già stata presa.",
  'We have send an email with new password. Please check your email.':
    "Abbiamo inviato un'e-mail con una nuova password. Si prega di controllare la tua email.",
  'This user is not registered with us':
    'Questo utente non è registrato con noi',
  'Your profile detail has been updated':
    'I dettagli del tuo profilo sono stati aggiornati',
};

export default text => {
  if (translations[text]) return translations[text];
  return text;
};
