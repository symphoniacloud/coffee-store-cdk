export function generateMessage(name?: string) {
  return name
    ? `Hello, ${name}!`
    : `Hello, anonymous! (pass 'name' query string parameter to give a more friendly greeting)`
}
