export function failure(res, message, status = 500, description = null) {
  const body = {error: message};
  if (description) body['description'] = description;

  res.status(status).send(body);
}
