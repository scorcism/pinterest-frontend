import { Box, Text, TextField } from "@radix-ui/themes";
import { XCircle } from "lucide-react";

const SelectTags = ({ tags, setTags }: { tags: string[]; setTags: any }) => {
  const handleTagSave = (e: any) => {
    const currtags: string = String(e.target.value);

    const customTagsArray: string[] = [];

    currtags.split(",").map((t: string) => {
      customTagsArray.push(t.trim());
    });
    setTags(customTagsArray);
  };

  return (
    <>
      <Box className="flex flex-col gap-2">
        <Box className="flex gap-2  flex-row justify-between items-center">
          <Box className="w-full">
            <TextField.Root className="flex-1">
              <TextField.Input
                placeholder="Enter the Tags. (Comma seperated)"
                size="3"
                className=""
                value={tags.join(",")}
                onChange={handleTagSave}
                maxLength={100}
              />
            </TextField.Root>
            <Text size="1" color="red" className="pl-1">
              Only 100 Charcters are allowed🐲
            </Text>
          </Box>
        </Box>
        <Box className="flex gap-3 w-[100vw] md:w-[100%] flex-wrap px-1">
          {tags.map((tag: string) => (
            <Box className="bg-gray-300 flex px-1 rounded-full items-center gap-[2px] ">
              {tag.length > 0 && (
                <>
                  <Text className="pl-1">{tag}</Text>
                  <XCircle
                    size="17px"
                    className="cursor-pointer"
                    onClick={() => {
                      setTags(() => tags.filter((t: string) => t != tag));
                    }}
                  />
                </>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default SelectTags;
