import { ref } from "vue";

export default function useModal() {
  const showModal = ref(false);
  const modalTitle = ref("");
  const modalMessage = ref("");
  const confirmText = ref(null);

  const openModal = (title, message, confirmLabel = null) => {
    modalTitle.value = title;
    modalMessage.value = message;
    confirmText.value = confirmLabel;
    showModal.value = true;
  };

  const closeModal = () => (showModal.value = false);

  return {
    showModal,
    modalTitle,
    modalMessage,
    confirmText,
    openModal,
    closeModal,
  };
}
