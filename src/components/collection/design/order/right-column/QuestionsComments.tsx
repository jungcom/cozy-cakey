import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface QuestionsCommentsProps {
  questionsComments: string;
  onQuestionsCommentsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function QuestionsComments({
  questionsComments,
  onQuestionsCommentsChange
}: QuestionsCommentsProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="questionsComments">Questions and Comments</Label>
      <Textarea
        id="questionsComments"
        name="questionsComments"
        value={questionsComments}
        onChange={onQuestionsCommentsChange}
        placeholder="Any questions or special requests?"
        className="min-h-[100px]"
      />
    </div>
  );
}