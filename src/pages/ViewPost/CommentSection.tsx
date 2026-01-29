import CommentList from "./components/CommentList";
import CreateAccountDialog from "./components/CreateAccountDialog";
import { ActionButton } from "@/components/common/Button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

function CommentSection() {
  return (
    <section
      id="comment-section"
      aria-labelledby="comment-label"
      className="flex flex-col gap-11 px-4 pt-6 pb-12.5 sm:px-12 sm:pt-8 md:p-0 lg:gap-12"
    >
      <form className="flex flex-col gap-3 sm:items-end md:gap-2">
        <Field className="flex flex-col gap-1 text-brown-400">
          <FieldLabel
            id="comment-label"
            htmlFor="comment"
            className="text-body-1"
          >
            Comment
          </FieldLabel>
          <CreateAccountDialog>
            <Textarea
              id="comment"
              placeholder="What are your thoughts?"
              className="min-h-25.5 text-body-1 bg-white placeholder:text-brown-400"
            />
          </CreateAccountDialog>
        </Field>
        <ActionButton variant="primary" className="w-fit">
          Send
        </ActionButton>
      </form>
      <CommentList />
    </section>
  );
}

export default CommentSection;
