import { injectable, inject } from "tsyringe";
import { IServiceProvider } from "../../../../domain/entities/IServiceProvider";
import { IServiceProviderRegistration } from "../../../../domain/entities/IServiceProvider";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { CloudinaryService } from "../../../../services/cloudinary/cloudinary";
import { ISkill } from "../../../../domain/entities/IServiceProvider";

@injectable()
export class ReapplyServiceProviderUseCase {
  constructor(
    @inject("IServiceProviderRepository")
    private serviceProviderRepository: IServiceProviderRepository,

    @inject("CloudinaryService")
    private cloudinaryService: CloudinaryService
  ) {}

  async execute(
    serviceProviderData: IServiceProviderRegistration,
    profileImageRow: string | null,
    documentRow: string | null,
    document2Row: string | null
  ): Promise<IServiceProvider> {
    const existingProvider = await this.serviceProviderRepository.findByUserID(
      serviceProviderData.userId
    );

    if (!existingProvider || !existingProvider._id) {
      throw new Error("Service provider not found");
    }

    /* ---------- Profile Image ---------- */

    let profileImage: string | undefined = existingProvider.profileImage;

    if (!profileImage) {
      throw new Error("Profile image is required");
    }

    if (
      profileImageRow &&
      !profileImageRow.startsWith("https://res.cloudinary.com")
    ) {
      profileImage = await this.cloudinaryService.uploadServiceProviderProfile(
        profileImageRow
      );
    }

    /* ---------- Documents ---------- */

    const documents: string[] = [];

    if (documentRow && !documentRow.startsWith("https://res.cloudinary.com")) {
      documents.push(await this.cloudinaryService.uploadDocuments(documentRow));
    } else if (existingProvider.document?.[0]) {
      documents.push(existingProvider.document[0]);
    }

    if (
      document2Row &&
      !document2Row.startsWith("https://res.cloudinary.com")
    ) {
      documents.push(
        await this.cloudinaryService.uploadDocuments(document2Row)
      );
    } else if (existingProvider.document?.[1]) {
      documents.push(existingProvider.document[1]);
    }

    /* ---------- Skills Mapping (FIXED) ---------- */

    const mappedSkills: ISkill[] = serviceProviderData.skills.map(
      (skillName) => ({
        name: skillName,
        level: "beginner", // default level (business rule)
      })
    );

    /* ---------- Build Update Payload ---------- */

    const updatePayload: Partial<IServiceProvider> = {
      serviceProviderName: serviceProviderData.serviceProviderName,
      serviceProviderEmail: serviceProviderData.serviceProviderEmail,
      serviceProviderPhone: serviceProviderData.serviceProviderPhone,
      experience: serviceProviderData.experience,
      location: serviceProviderData.location,
      services: serviceProviderData.services,
      skills: mappedSkills,
      serviceMode: serviceProviderData.serviceMode,
      businessType: serviceProviderData.businessType,
      category: serviceProviderData.category,
      subcategory: serviceProviderData.subcategory,
      socialMedia: serviceProviderData.socialMedia,
      description: serviceProviderData.description,

      profileImage,
      document: documents,
      isVerified: "pending",
    };

    /* ---------- Update ---------- */

    return await this.serviceProviderRepository.updateRegistration(
      existingProvider._id,
      updatePayload
    );
  }
}
