interface AvatarProps {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 10 }: AvatarProps) {
    // Extracts initials from the name
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gray-300 text-blue font-semibold`}
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
          fontSize: `${size * 1.5}px`,
        }}
      >
        {initials}
      </div>
    );
  }