export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.$storage.getUniversal('_login')) {
     return redirect('/login')
    }
  }
  