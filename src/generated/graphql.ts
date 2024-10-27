import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type GeoJsonLineStringType = {
  __typename?: 'GeoJSONLineStringType';
  coordinates?: Maybe<Array<Maybe<Array<Maybe<Scalars['Int']['output']>>>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type GeoJsonPointType = {
  __typename?: 'GeoJSONPointType';
  coordinates?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Track = {
  __typename?: 'Track';
  description?: Maybe<Scalars['String']['output']>;
  endPoint: GeoJsonPointType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  properties: TrackPropertiesType;
  recordedAt: Scalars['Date']['output'];
  route: GeoJsonLineStringType;
  startPoint: GeoJsonPointType;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type TrackPropertiesType = {
  __typename?: 'TrackPropertiesType';
  avgSpeed?: Maybe<Scalars['Int']['output']>;
  distance: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  elevations: Array<Maybe<Scalars['Int']['output']>>;
  timestamps: Array<Maybe<Scalars['String']['output']>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  GeoJSONLineStringType: ResolverTypeWrapper<GeoJsonLineStringType>;
  GeoJSONPointType: ResolverTypeWrapper<GeoJsonPointType>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Track: ResolverTypeWrapper<Track>;
  TrackPropertiesType: ResolverTypeWrapper<TrackPropertiesType>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  GeoJSONLineStringType: GeoJsonLineStringType;
  GeoJSONPointType: GeoJsonPointType;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  String: Scalars['String']['output'];
  Track: Track;
  TrackPropertiesType: TrackPropertiesType;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GeoJsonLineStringTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoJSONLineStringType'] = ResolversParentTypes['GeoJSONLineStringType']> = {
  coordinates?: Resolver<Maybe<Array<Maybe<Array<Maybe<ResolversTypes['Int']>>>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoJsonPointTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoJSONPointType'] = ResolversParentTypes['GeoJSONPointType']> = {
  coordinates?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Track'] = ResolversParentTypes['Track']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endPoint?: Resolver<ResolversTypes['GeoJSONPointType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<ResolversTypes['TrackPropertiesType'], ParentType, ContextType>;
  recordedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  route?: Resolver<ResolversTypes['GeoJSONLineStringType'], ParentType, ContextType>;
  startPoint?: Resolver<ResolversTypes['GeoJSONPointType'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrackPropertiesTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrackPropertiesType'] = ResolversParentTypes['TrackPropertiesType']> = {
  avgSpeed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  elevations?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>;
  timestamps?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  GeoJSONLineStringType?: GeoJsonLineStringTypeResolvers<ContextType>;
  GeoJSONPointType?: GeoJsonPointTypeResolvers<ContextType>;
  Track?: TrackResolvers<ContextType>;
  TrackPropertiesType?: TrackPropertiesTypeResolvers<ContextType>;
};

