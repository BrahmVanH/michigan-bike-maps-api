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
  DateTimeISO: { input: any; output: any; }
};

export type GeoJsonLineString = {
  __typename?: 'GeoJSONLineString';
  coordinates: Array<Array<Scalars['Float']['output']>>;
  type: Scalars['String']['output'];
};

export type GeoJsonPoint = {
  __typename?: 'GeoJSONPoint';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  track?: Maybe<TrackOrm>;
  tracks: Array<TrackOrm>;
};

export type TrackOrm = {
  __typename?: 'TrackORM';
  description?: Maybe<Scalars['String']['output']>;
  endPoint: GeoJsonPoint;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  properties?: Maybe<TrackProperties>;
  recordedAt: Scalars['DateTimeISO']['output'];
  route: GeoJsonLineString;
  startPoint: GeoJsonPoint;
  tags: Array<Scalars['String']['output']>;
};

export type TrackProperties = {
  __typename?: 'TrackProperties';
  avgSpeed?: Maybe<Scalars['Float']['output']>;
  distance: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  elevations: Array<Scalars['Float']['output']>;
  timestamps: Array<Scalars['String']['output']>;
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
  DateTimeISO: ResolverTypeWrapper<Scalars['DateTimeISO']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GeoJSONLineString: ResolverTypeWrapper<GeoJsonLineString>;
  GeoJSONPoint: ResolverTypeWrapper<GeoJsonPoint>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TrackORM: ResolverTypeWrapper<TrackOrm>;
  TrackProperties: ResolverTypeWrapper<TrackProperties>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTimeISO: Scalars['DateTimeISO']['output'];
  Float: Scalars['Float']['output'];
  GeoJSONLineString: GeoJsonLineString;
  GeoJSONPoint: GeoJsonPoint;
  ID: Scalars['ID']['output'];
  Query: {};
  String: Scalars['String']['output'];
  TrackORM: TrackOrm;
  TrackProperties: TrackProperties;
};

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeISO'], any> {
  name: 'DateTimeISO';
}

export type GeoJsonLineStringResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoJSONLineString'] = ResolversParentTypes['GeoJSONLineString']> = {
  coordinates?: Resolver<Array<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoJsonPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoJSONPoint'] = ResolversParentTypes['GeoJSONPoint']> = {
  coordinates?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  track?: Resolver<Maybe<ResolversTypes['TrackORM']>, ParentType, ContextType>;
  tracks?: Resolver<Array<ResolversTypes['TrackORM']>, ParentType, ContextType>;
};

export type TrackOrmResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrackORM'] = ResolversParentTypes['TrackORM']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endPoint?: Resolver<ResolversTypes['GeoJSONPoint'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<Maybe<ResolversTypes['TrackProperties']>, ParentType, ContextType>;
  recordedAt?: Resolver<ResolversTypes['DateTimeISO'], ParentType, ContextType>;
  route?: Resolver<ResolversTypes['GeoJSONLineString'], ParentType, ContextType>;
  startPoint?: Resolver<ResolversTypes['GeoJSONPoint'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrackPropertiesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrackProperties'] = ResolversParentTypes['TrackProperties']> = {
  avgSpeed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elevations?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  timestamps?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTimeISO?: GraphQLScalarType;
  GeoJSONLineString?: GeoJsonLineStringResolvers<ContextType>;
  GeoJSONPoint?: GeoJsonPointResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TrackORM?: TrackOrmResolvers<ContextType>;
  TrackProperties?: TrackPropertiesResolvers<ContextType>;
};

