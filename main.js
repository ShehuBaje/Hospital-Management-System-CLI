const prompt = require('prompt-sync')({ signit: true });
const UserManager = require('./manager/UserManager');
const DoctorManager = require('./manager/DoctorManager');
const PatientManager = require('./manager/PatientManager');

async function main() {
    console.log('\n=== WELCOME TO HOSPITAL MANAGEMENT CLI ===');

    const role = prompt('Are you an admin, doctor or patient? ').toLowerCase();

    try {
        if (role === 'admin') {
            const action = prompt('Register, login or view users? ').toLowerCase();

            if (action === 'register') {
                const name = prompt('Name: ').trim();
                const email = prompt('Email: ').trim();
                const password = prompt('Password: ');
                const admin = await UserManager.registerAdmin(name, email, password);
                console.log('Admin registered:', admin);
            } else if (action === 'login') {
                const email = prompt('Email: ').trim();
                const password = prompt('Password: ');
                const admin = await UserManager.loginAdmin(email, password);
                console.log(`Welcome ${admin.name}!`);

                while (true) {
                    const adminAction = prompt('\nChoose an action (register doctor, register patient, view users, delete user, or type "exit" to logout): ').toLowerCase();

                    if (adminAction === 'exit') {
                        console.log('Logging out...');
                        break;
                    }

                    switch (adminAction) {
                        case 'register doctor':
                            const docName = prompt("Doctor's Name: ").trim();
                            const docEmail = prompt("Doctor's Email: ").trim();
                            const doctor = await UserManager.registerDoctor(docName, docEmail);
                            console.log('Doctor registered successfully:', doctor);
                            break;

                        case 'register patient':
                            const patName = prompt("Patient's Name: ").trim();
                            const patAge = prompt("Patient's Age: ");
                            const patient = await PatientManager.registerPatient(patName, patAge);
                            console.log('Patient registered successfully:', patient);
                            break;

                        case 'view users':
                            const users = await UserManager.getAllUsers();
                            console.log('All users:\n', users);
                            break;

                        case 'delete user':
                            const id = Number(prompt('Enter user ID to delete: '));
                            if (isNaN(id)) {
                                console.log('Invalid ID.');
                            } else {
                                await UserManager.deleteUser(id);
                                console.log('User deleted successfully.');
                            }
                            break;

                        default:
                            console.log('Unknown action. Try again.');
                    }
                }
            }
        } else if (role === 'doctor') {
            const patients = await DoctorManager.getAllPatients();
            console.log('All patients:', patients);

            const patientId = Number(prompt("Patient's ID to update: "));
            if (isNaN(patientId)) {
                console.log('Invalid ID.');
                return;
            }

            const diagnosis = prompt('Diagnosis: ');
            const treatment = prompt('Treatment: ');
            const updated = await DoctorManager.assignDiagnosis(patientId, diagnosis, treatment);
            console.log('Updated record:', updated);
        } else if (role === 'patient') {
            const id = Number(prompt('Enter your patient ID: '));
            if (isNaN(id)) {
                console.log('Invalid ID.');
                return;
            }

            const patient = await PatientManager.getPatientById(id);
            if (!patient) {
                console.log('Patient not found.');
            } else {
                console.log('Your record:', patient);
            }
        } else {
            console.log('Invalid role.');
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
}

main();