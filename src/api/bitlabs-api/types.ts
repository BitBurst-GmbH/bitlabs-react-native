export type Survey = {
  id: string;
  type: string;
  /** @deprecated Use `clickUrl` instead. */
  click_url: string;
  clickUrl: string;
  cpi: string;
  value: string;
  loi: number;
  country: string;
  language: string;
  rating: number;
  category: {
    name: string;
    /** @deprecated Use `iconUrl` instead. */
    icon_url: string;
    iconUrl: string;
    /** @deprecated Use `iconName` instead. */
    icon_name: string;
    iconName: string;
    /** @deprecated Use `nameInternal` instead. */
    name_internal: string;
    nameInternal: string;
  };
  tags: [];
};
