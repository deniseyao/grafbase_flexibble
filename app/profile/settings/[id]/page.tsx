import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import ProfileSettingsForm from "@/components/ProfileSettingsForm";
import { getUserById } from "@/lib/actions";
import { UserProfile } from "@/common.types";

const ProfileSettings = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getUserById(id)) as {
    user?: UserProfile;
  };

  if (!result?.user)
    return <p className="no-result-text">Failed to fetch user info.</p>;

  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <h1 className="text-4xl font-bold">Profile Settings</h1>

      <ProfileSettingsForm session={session} user={result?.user} />
    </section>
  );
};

export default ProfileSettings;
