import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Note } from "../contexts/NotesProvider";
import { db, storage } from "../firebase/config";

export type NoteWithoutId = Omit<Note, "id">;

// Get a reference to the users collection
const usersCollection = collection(db, "users");

export const createNote = async (
  userId: string,
  noteWithoutId: NoteWithoutId
) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const notesCollection = collection(userDocRef, "notes");
    const docRef = await addDoc(notesCollection, {
      title: noteWithoutId.title,
      content: noteWithoutId.content,
    });

    return {
      id: docRef.id,
      title: noteWithoutId.title,
      content: noteWithoutId.content,
    };
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error.code, error.message);
    }
  }
};

// @note - not currently used
// export const readNote = async (userId: string, noteId: string) => {
//   try {
//     const userDocRef = doc(usersCollection, userId);
//     const notesCollection = collection(userDocRef, "notes");
//     const docRef = doc(notesCollection, noteId);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return docSnap.data();
//     } else {
//       // doc.data() will be undefined in this case
//       // console.error("No such document!");
//       throw new Error("No such document!");
//     }
//   } catch (error: unknown) {
//     if (error instanceof FirebaseError) {
//       console.error(error.code, error.message);
//     }
//   }
// };

export const readAllNotes = async (userId: string) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const notesCollection = collection(userDocRef, "notes");
    const querySnapshot = await getDocs(notesCollection);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error.code, error.message);
    }
  }
};

export const updateNote = async (userId: string, note: Note) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const notesCollection = collection(userDocRef, "notes");
    const docRef = doc(notesCollection, note.id);
    await updateDoc(docRef, {
      title: note.title,
      content: note.content,
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error.code, error.message);
    }
  }
};

export const deleteNote = async (userId: string, noteId: string) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const notesCollection = collection(userDocRef, "notes");
    const docRef = doc(notesCollection, noteId);

    // Get coverImageUrl from doc
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    // If has coverImageUrl, delete it from storage first
    if (data?.coverImageUrl) {
      // Create a reference to the file location
      const imageRef = ref(
        storage,
        `users/${userId}/notes/${noteId}/coverImage.jpg`
      );
      deleteObject(imageRef);
    }

    await deleteDoc(docRef);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error.code, error.message);
    }
  }
};

export const uploadNoteCoverImage = async (
  userId: string,
  noteId: string,
  file: File
) => {
  // Create a reference to the file location
  const imageRef = ref(
    storage,
    `users/${userId}/notes/${noteId}/coverImage.jpg`
  );
  const uploadTask = await uploadBytesResumable(imageRef, file);
  // Get the download URL
  const downloadURL = await getDownloadURL(uploadTask.ref);

  // Save cover image URL to Firestore
  const userDocRef = doc(usersCollection, userId);
  const notesCollection = collection(userDocRef, "notes");
  const docRef = doc(notesCollection, noteId);
  await updateDoc(docRef, {
    coverImageUrl: downloadURL,
  });

  // Return the URL
  return downloadURL;
};

export const deleteNoteCoverImage = async (userId: string, noteId: string) => {
  try {
    const userDocRef = doc(usersCollection, userId);
    const notesCollection = collection(userDocRef, "notes");
    const docRef = doc(notesCollection, noteId);

    // Get coverImageUrl from doc
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    // If has coverImageUrl, delete it from storage
    if (data?.coverImageUrl) {
      // Create a reference to the file location
      const imageRef = ref(
        storage,
        `users/${userId}/notes/${noteId}/coverImage.jpg`
      );
      deleteObject(imageRef);
    }

    // Remove coverImageUrl from Firestore
    await updateDoc(docRef, {
      coverImageUrl: deleteField(),
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error.code, error.message);
    }
  }
};
