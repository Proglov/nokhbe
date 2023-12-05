

export default function Error({ statusCode }) {
  console.log(statusCode)
  return (
    <p>
      {statusCode
        ? `An Error ${statusCode} Occured On Server`
        : 'An Error Occured On Client'
      }
    </p>
  )
}
