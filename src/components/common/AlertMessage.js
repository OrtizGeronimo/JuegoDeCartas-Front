import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'


export default function AlertMessage(props){
  return (
    <Alert status={props.status} borderRadius="15px">
      <AlertIcon />
      { props.title && <AlertTitle>{props.title}</AlertTitle> }
      { props.description && <AlertDescription>{props.description}</AlertDescription>}
    </Alert>
  )
}