import firebase from 'firebase'
import config from '../config'

// Initialize Firebase

export const initFirebase = () => {
	console.log('Connecting to Firebase...')
	firebase.initializeApp(config)
	// firebase.analytics()
}
