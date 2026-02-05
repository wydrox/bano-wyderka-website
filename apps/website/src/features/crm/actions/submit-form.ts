
import { createPerson, createNote } from '../services/twenty';

export async function submitToCrm(formData: {
  name: string;
  phone: string;
  email?: string;
  carInfo?: string;
  message?: string;
  type: 'contact' | 'booking';
  details?: string;
}) {
  try {
    const [firstName, ...lastNameParts] = formData.name.split(' ');
    const lastName = lastNameParts.join(' ') || '-';

    const person = await createPerson({
      firstName,
      lastName,
      email: formData.email,
      phoneNumber: formData.phone,
    });

    if (person && person.id) {
      const personId = person.id;
      
      let noteBody = `Form Type: ${formData.type}\n`;
      if (formData.carInfo) noteBody += `Car: ${formData.carInfo}\n`;
      if (formData.message) noteBody += `Message: ${formData.message}\n`;
      if (formData.details) noteBody += `Booking Details: ${formData.details}\n`;

      await createNote({
        body: noteBody,
        personId,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('CRM Submission Error:', error);
    return { success: false, error: (error as Error).message };
  }
}
