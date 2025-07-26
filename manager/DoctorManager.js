const {readData, writeData} = require('../utils/fileHandler');
const PATIENTS_FILE = 'patients.json';

class DoctorManager {
    static async assignDiagnosis(patientId, diagnosis, treatment) {
        const patients = await readData(PATIENTS_FILE);
        const patient = patients.find(p => p.id === patientId);
        if (!patient) throw new Error('Patient not found.');

        patient.diagnosis = diagnosis;
        patient.treatment = treatment;

        await writeData(PATIENTS_FILE, patients);
        return patient;
    }

    static async getAllPatients() {
        return await readData(PATIENTS_FILE);
    }
}

module.exports = DoctorManager;