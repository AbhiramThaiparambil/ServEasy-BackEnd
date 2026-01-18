// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import { HttpStatus } from "../../../constants/HttpStatus";
// import { SaveMessageUseCase } from "../../../application/use-case/chat/saveMessage/SaveMessage.usecase";
// import { USE_CASE_TOKENS } from "../../../constants/tokens";

// export const getSpecificChat = async (req: Request, res: Response) => {
//   try {
//     const { sender, reciver } = req.body;
//     console.log(sender, reciver);

//     if (!sender || !reciver) {
//       res
//         .status(HttpStatus.BAD_REQUEST)
//         .json({ message: "senderId and receiverId are required" });
//       return;
//     }
//     USE_CASE_TOKENS.SaveMessageUseCase;
//     const saveMessageUseCase = container.resolve(ISaveMessageUseCase);
//     const data = await saveMessageUseCase.getSpecificChat(
//       sender as string,
//       reciver as string,
//     );

//     res.status(HttpStatus.OK).json({ data });
//     return;
//   } catch (error) {
//     console.error("Error getting specific chat:", error);
//     res
//       .status(HttpStatus.INTERNAL_SERVER_ERROR)
//       .json({ message: "Internal server error" });

//     return;
//   }
// };
