export type GetCurrentUserResponse = {
  data: {
    id: number;
    username: string;
    name: string;
    image: string;
    email?: string;
    verifiedAt?: string | null;
  };
};

export type SearchPostsResponse = {
  data: {
    id: string;
    content: string | null;
    type: "post" | "quote" | "reply" | "repost";
    createdAt?: string | string;
    updatedAt?: string | string;
    media: {
      url: string;
      mimeType: string;
      updatedAt?: string | string;
    }[];
    hashtags: string[];
    links?: {
      title: string | null;
      description: string | null;
      image: string | null;
      url: string;
    }[];
    counts: {
      replies: number;
      reposts: number;
      bookmarks: number;
      likes: number;
    };
    viewer: {
      reposted: boolean;
      liked: boolean;
    } | null;
    user?: {
      id: string;
      username: string;
      name: string;
      image: string;
      verifiedAt?: (string | string) | null;
    };
    parent?: {
      id: string;
      content: string | null;
      type: "post" | "quote" | "reply" | "repost";
      createdAt?: string | string;
      updatedAt?: string | string;
      media: {
        url: string;
        mimeType: string;
        updatedAt?: string | string;
      }[];
      hashtags: string[];
      links?: {
        title: string | null;
        description: string | null;
        image: string | null;
        url: string;
      }[];
      counts: {
        replies: number;
        reposts: number;
        bookmarks: number;
        likes: number;
      };
      viewer: {
        reposted: boolean;
        liked: boolean;
      } | null;
      user?: {
        id: string;
        username: string;
        name: string;
        image: string;
        verifiedAt?: (string | string) | null;
      };
    } | null;
    replies?: {
      id: string;
      content: string | null;
      type: "post" | "quote" | "reply" | "repost";
      createdAt?: string | string;
      updatedAt?: string | string;
      media: {
        url: string;
        mimeType: string;
        updatedAt?: string | string;
      }[];
      hashtags: string[];
      links?: {
        title: string | null;
        description: string | null;
        image: string | null;
        url: string;
      }[];
      counts: {
        replies: number;
        reposts: number;
        bookmarks: number;
        likes: number;
      };
      viewer: {
        reposted: boolean;
        liked: boolean;
      } | null;
      user?: {
        id: string;
        username: string;
        name: string;
        image: string;
        verifiedAt?: (string | string) | null;
      };
    }[];
  }[];
  meta: {
    totalPages: number;
    nextCursor?: string;
  };
};

export type CreatePostResponse = {
  data: {
    id: string;
    content: string | null;
    type: "post" | "quote" | "reply" | "repost";
    createdAt?: string;
    updatedAt?: string;
    media: {
      url: string;
      mimeType: string;
      updatedAt?: string | string;
    }[];
    hashtags: string[];
    links?: {
      title: string | null;
      description: string | null;
      image: string | null;
      url: string;
    }[];
    counts: {
      replies: number;
      reposts: number;
      bookmarks: number;
      likes: number;
    };
    viewer: {
      reposted: boolean;
      liked: boolean;
    } | null;
    user?: {
      id: string;
      username: string;
      name: string;
      image: string;
      verifiedAt?: string | null;
    };
    parent?: {
      id: string;
      content: string | null;
      type: "post" | "quote" | "reply" | "repost";
      createdAt?: string;
      updatedAt?: string;
      media: {
        url: string;
        mimeType: string;
        updatedAt?: string | string;
      }[];
      hashtags: string[];
      links?: {
        title: string | null;
        description: string | null;
        image: string | null;
        url: string;
      }[];
      counts: {
        replies: number;
        reposts: number;
        bookmarks: number;
        likes: number;
      };
      viewer: {
        reposted: boolean;
        liked: boolean;
      } | null;
      user?: {
        id: string;
        username: string;
        name: string;
        image: string;
        verifiedAt?: string | null;
      };
    } | null;
    replies?: {
      id: string;
      content: string | null;
      type: "post" | "quote" | "reply" | "repost";
      createdAt?: string | string;
      updatedAt?: string | string;
      media: {
        url: string;
        mimeType: string;
        updatedAt?: string | string;
      }[];
      hashtags: string[];
      links?: {
        title: string | null;
        description: string | null;
        image: string | null;
        url: string;
      }[];
      counts: {
        replies: number;
        reposts: number;
        bookmarks: number;
        likes: number;
      };
      viewer: {
        reposted: boolean;
        liked: boolean;
      } | null;
      user?: {
        id: string;
        username: string;
        name: string;
        image: string;
        verifiedAt?: (string | string) | null;
      };
    }[];
  };
};
