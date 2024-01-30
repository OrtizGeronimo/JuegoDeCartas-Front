import { enqueueSnackbar } from 'notistack'

function errorSnackbar(message){
  enqueueSnackbar(message, { 'variant': 'error', 'autoHideDuration': 3000 })
}

function successSnackbar(message){
  enqueueSnackbar(message, { 'variant': 'success', 'autoHideDuration': 3000 })
}

function infoSnackbar(message){
  enqueueSnackbar(message, { 'variant': 'info',  'autoHideDuration': 3000 })
}

export { errorSnackbar, successSnackbar, infoSnackbar }