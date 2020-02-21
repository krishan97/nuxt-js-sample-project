export default function ({ store, redirect }) {
    // If the user is authenticated
    if (store.$storage.getUniversal('_login')) {
        return redirect('/home')
    }
}
