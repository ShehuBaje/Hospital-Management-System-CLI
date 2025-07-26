const {readData, writeData} = require('../utils/fileHandler');

const PATIENTS_FILE = 'patients.json';

class PatientManager{
    static async registerPatient(name, age) {
        if (!name || !age) throw new Error('Name and age are required');

        const patients = await readData(PATIENTS_FILE);
        const patient = {id: Date.now(), name, age, diagnosis: '', treatment: ''};
        patients.push(patient);
        await writeData(PATIENTS_FILE, patients);
        return patient;
    }

    static async getPatientById(id) {
        const patients = await readData(PATIENTS_FILE);
        return patients.find(p => p.id === id);
    }
}

module.exports = PatientManager;