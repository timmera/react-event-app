import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const DeleteEvent = ({ event }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onDelete = async () => {
    const deleteEvent = async () => {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete the event. Status: ${response.status}`
        );
      }
    };

    try {
      await toast.promise(deleteEvent(), {
        success: {
          title: 'Event deleted',
          description: `${event.title} is succesfully deleted.`,
        },
        error: {
          title: 'Something went wrong',
          description: `${event.title} couldn't be deleted`,
        },
        loading: {
          title: 'Please wait',
          description: `${event.title} is being deleted`,
        },
      });
    } catch (error) {
      console.error('An error occurred while deleting the event:', error);
    } finally {
      onClose();
      navigate(`/`);
    }
  };

  return (
    <>
      <Button
        leftIcon={<MdDelete />}
        colorScheme="red"
        size="sm"
        variant="outline"
        onClick={onOpen}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={['xs', 'sm', 'md']}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent textAlign="center">
          <ModalHeader fontWeight="bold">Caution!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the event:{' '}
            <strong>{event.title}</strong>?
          </ModalBody>
          <ModalFooter flexDirection={['column', 'row']} gap="10px">
            <Button
              onClick={onClose}
              colorScheme="ghost"
              size="sm"
              variant="outline"
            >
              No, please go back
            </Button>
            <Button
              onClick={onDelete}
              colorScheme="red"
              size="sm"
              variant="outline"
            >
              Yes, I want to delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
